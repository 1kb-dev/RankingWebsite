class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0
        self.wins = 0
        self.losses = 0

    def win(self):
        self.wins += 1
        self.score += 1

    def lose(self):
        self.losses += 1
        self.score -= 1
    @property
    def winrate(self):
        if self.wins + self.losses == 0:
            return 0
        return (self.wins / (self.wins + self.losses)) * 100
