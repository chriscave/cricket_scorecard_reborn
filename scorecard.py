from typing import List


class Player:
    def __init__(self, name: str):
        self.name = name
        self.bat_inns = dict()
        self.bowl_inns = dict()

    def bowler_add_ball(self, outcome: str, over_no: int, ball_no: int):
        over_in_progress = self.bowl_inns.get(over_no)
        if over_in_progress:
            over_in_progress[ball_no] = outcome
        else:
            new_over = ["DNB" for _ in range(6)]
            self.bowl_inns[over_no] = new_over
            self.bowl_inns[over_no][ball_no] = outcome

    def batter_add_ball(self, outcome, over_no: int, ball_no: int):
        over_in_progress = self.bat_inns.get(over_no)
        if over_in_progress:
            over_in_progress[ball_no] = outcome
        else:
            new_over = ["DNB" for _ in range(6)]
            self.bat_inns[over_no] = new_over
            self.bat_inns[over_no][ball_no] = outcome


class Innings:
    def __init__(self, batting_team: List[Player], bowling_team: List[Player]):
        if not (len(batting_team) == 11 and len(bowling_team) == 11):
            raise Exception(
                f"Teams must have 11 players but batting_team has {len(batting_team)} and bowling_team has length {len(bowling_team)}"
            )

        self.batting_team = batting_team
        self.bowling_team = bowling_team

    def get_innings_scorecard(self):
        scorecard = {}
        for player in self.bowling_team:
            for over_no in player.bowl_inns:
                scorecard[over_no] = player[over_no]
        return scorecard

    @staticmethod
    def check_over_ended(over):
        return len(over) == 6

    def add_ball(self, bowler: Player, batter: Player, outcome, over_no, ball_no):

        bowler.bowler_add_ball(outcome, over_no, ball_no)
        batter.batter_add_ball(outcome, over_no, ball_no)
