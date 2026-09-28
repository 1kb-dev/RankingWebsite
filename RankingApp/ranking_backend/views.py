import json
import random
from time import sleep

from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Player
from datetime import datetime

leaderboard = []

online_players = []

last_10_matches = []

connections = {}

def get_ranking(request):
    ranked = sorted(leaderboard, key=lambda p: p.score, reverse=True)
    data = [{"name": p.name, "score": p.score, "winrate": p.winrate} for p in ranked]
    return JsonResponse(data, safe=False)


def get_last_10_matches(request):
    return JsonResponse(last_10_matches, safe=False)


def join_game(request):
    name = request.GET.get("name")
    if not name:
        return JsonResponse({"error": "name is required"}, status=400)

    def event_stream():
        connections[name] = connections.get(name, 0) + 1
        if name not in online_players:
            online_players.append(name)
        if not any(p.name == name for p in leaderboard):
            leaderboard.append(Player(name))
        try:
            last = None
            while True:
                players = online_players.copy()
                if players != last:
                    yield f"data: {json.dumps(players)}\n\n"
                    last = players
                else:
                    yield ": keepalive\n\n"
                sleep(1)
        finally:
            # runs when the client disconnects (generator gets closed)
            connections[name] -= 1
            if connections[name] <= 0:
                del connections[name]
                if name in online_players:
                    online_players.remove(name)

    response = StreamingHttpResponse(event_stream(), content_type="text/event-stream")
    response["Cache-Control"] = "no-cache"
    response["X-Accel-Buffering"] = "no"
    return response


@csrf_exempt
def fight(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid JSON"}, status=400)

        p1 = body.get("p1", "Unknown")
        p2 = body.get("p2", "Unknown")

        return random_set_winner(p1, p2)
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)


def random_set_winner(p1, p2):
    winner = random.choice([p1, p2])
    loser = p2 if winner == p1 else p1
    last_10_matches.insert(
        0, {"match_id": len(last_10_matches) + 1, "winner": winner, "loser": loser, "time": datetime.now().isoformat() }
    )
    if len(last_10_matches) > 10:
        last_10_matches.pop()
    for player in leaderboard:
        if player.name == winner:
            player.score += 1
            player.wins += 1
        elif player.name == loser:
            player.score -= 1
            player.losses += 1

    return JsonResponse({"winner": winner, "loser": loser})
