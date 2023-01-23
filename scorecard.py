from typing import List


class Player:
    def __init__(self, name: str):
        self.name = name
        self.bat_inns = dict()
        self.bowl_inns = dict()

    def bowler_add_ball(self, outcome: str, over_no: int):
        current_over = self.bowl_inns.get(over_no)
        if current_over:
            current_over.append(outcome)
        else:
            self.bowl_inns[over_no] = [outcome]


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
        self.team1_bat_inns = dict()
        self.team2_bat_inns = dict()

    def add_ball(self, bowler: Player, outcome):
        if bowler in self.team1:
            inns = self.team2_bat_inns
        else:
            inns = self.team1_bat_inns

        if inns:
            last_over_no = max(list(inns.keys()))
            last_over = inns[last_over_no]
            last_bowler = list(last_over.keys())[0]

            over = list(last_over.values())[0]
            if len(over) == 6:
                if last_bowler == bowler:
                    raise Exception(
                        f"{bowler.name} bowled the last over so can not bowl a new over",
                    )
                inns[last_over_no + 1] = {bowler: [outcome]}
                bowler.bowler_add_ball(outcome, last_over_no + 1)
            else:
                if not last_bowler == bowler:
                    raise Exception(
                        f"{last_bowler.name} is the current bowler but {bowler.name} was passed",
                    )
                last_over[bowler].append(outcome)
                bowler.bowler_add_ball(outcome, last_over_no)

        else:
            inns[1] = {bowler: [outcome]}
