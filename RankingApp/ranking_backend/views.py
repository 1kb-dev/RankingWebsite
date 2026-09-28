from asyncio import sleep
from hashlib import new
import json
from time import time
from time import sleep
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Player
# import random
import random

leaderboard = []

online_players = []

last_10_matches = []


def get_ranking(request):
    ranked = sorted(leaderboard, key=lambda p: p.score, reverse=True)
    data = [{"name": p.name, "score": p.score} for p in ranked]
    return JsonResponse(data, safe=False)

def get_last_10_matches(request):
    return JsonResponse(last_10_matches, safe=False)

def get_online_players(request):
    return JsonResponse(online_players, safe=False)

@csrf_exempt
def join_game(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid JSON"}, status=400)
        playername = body.get("name", "Unknown")
        online_players.append(playername)
        player = Player(playername)
        leaderboard.append(player)
        return JsonResponse({"message": playername + " joined the game!"})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)

@csrf_exempt
def fight(request):
    if request.method == 'POST':
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
    last_10_matches.insert(0, {"match_id": len(last_10_matches) + 1, "winner": winner, "loser": loser})
    if len(last_10_matches) > 10:
        last_10_matches.pop()
    for player in leaderboard:
        if player.name == winner:
            player.score += 1
        elif player.name == loser:
            player.score -= 1

    return JsonResponse({"winner": winner, "loser": loser})


def this_is_a_test(request):
    while True:
        sleep(1)

    return HttpResponse("This is a test view.")
