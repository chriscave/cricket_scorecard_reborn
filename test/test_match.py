import unittest
import pytest

from scorecard import Match, Player


class TestMatch(unittest.TestCase):
    def test_add_ball_new_inns(self):
        team1 = [Player(f"1-{i}") for i in range(11)]
        team1_name = "A"
        team2 = [Player(f"2-{i}") for i in range(11)]
        team2_name = "B"
        match = Match(team1, team1_name, team2, team2_name)

        match.add_ball(team1[0], "1")

        actual = match.team2_bat_inns
        expected = [{team1[0]: ["1"]}]
        self.assertEqual(actual, expected)

    def test_add_ball_new_over(self):
        team1 = [Player(f"1-{i}") for i in range(11)]
        team1_name = "A"
        team2 = [Player(f"2-{i}") for i in range(11)]
        team2_name = "B"
        match = Match(team1, team1_name, team2, team2_name)

        match.team2_bat_inns = [{team1[0]: ["0", "0", "0", "0", "0", "0"]}]
        match.add_ball(team1[1], "4")
        actual = match.team2_bat_inns
        expected = [{team1[0]: ["0", "0", "0", "0", "0", "0"]}, {team1[1]: ["4"]}]
        self.assertEqual(actual, expected)

    def test_add_ball_current_over(self):
        team1 = [Player(f"1-{i}") for i in range(11)]
        team1_name = "A"
        team2 = [Player(f"2-{i}") for i in range(11)]
        team2_name = "B"
        match = Match(team1, team1_name, team2, team2_name)

        match.team2_bat_inns = [{team1[0]: ["0", "0", "0"]}]
        match.add_ball(team1[0], "4")
        actual = match.team2_bat_inns
        expected = [{team1[0]: ["0", "0", "0", "4"]}]
        self.assertEqual(actual, expected)
