from typing import List


class Player:
    def __init__(self, name: str):
        self.name = name
        self.bat_inns = dict()
        self.bowl_inns = dict()


class Match:
    def __init__(
        self, team1: List[Player], team1_name: str, team2: List[Player], team2_name: str
    ):
        if not (len(team1) == 11 and len(team2) == 11):
            raise Exception(
                f"Teams must have 11 players but {team1_name} has {len(team1)} and {team2_name} has length {len(team2)}"
            )

        self.team1 = team1
        self.team1_name = team1_name
        self.team2 = team2
        self.team2_name = team2_name
        self.team1_bat_inns = []
        self.team2_bat_inns = []

    def add_ball(self, bowler: Player, outcome):
        if bowler in self.team1:
            inns = self.team2_bat_inns
        else:
            inns = self.team1_bat_inns

        if inns:
            last_over = inns[-1]
            last_bowler = list(last_over.keys())[0]

            over = list(last_over.values())[0]
            if len(over) == 6:
                if last_bowler == bowler:
                    raise Exception(
                        f"{bowler.name} bowled the last over so can not bowl a new over",
                    )
                inns.append({bowler: [outcome]})
            else:
                if not last_bowler == bowler:
                    raise Exception(
                        f"{last_bowler.name} is the current bowler but {bowler.name} was passed",
                    )
                last_over[bowler].append(outcome)

        else:
            inns.append({bowler: [outcome]})
