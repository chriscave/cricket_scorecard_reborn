import unittest
import pytest

from scorecard import Match, Player


class TestMatch(unittest.TestCase):
    def setUp(self):
        self.team1 = [Player(f"1-{i}") for i in range(11)]
        self.team1_name = "A"
        self.team2 = [Player(f"2-{i}") for i in range(11)]
        self.team2_name = "B"
        self.match = Match(self.team1, self.team1_name, self.team2, self.team2_name)

    def test_add_ball_new_inns(self):

        self.match.add_ball(self.team1[0], "1")

        actual = self.match.team2_bat_inns
        expected = [{self.team1[0]: ["1"]}]
        self.assertEqual(actual, expected)

    def test_add_ball_new_over(self):

        self.match.team2_bat_inns = [{self.team1[0]: ["0", "0", "0", "0", "0", "0"]}]
        self.match.add_ball(self.team1[1], "4")
        actual = self.match.team2_bat_inns
        expected = [
            {self.team1[0]: ["0", "0", "0", "0", "0", "0"]},
            {self.team1[1]: ["4"]},
        ]
        self.assertEqual(actual, expected)

    def test_add_ball_current_over(self):
        self.match.team2_bat_inns = [{self.team1[0]: ["0", "0", "0"]}]
        self.match.add_ball(self.team1[0], "4")
        actual = self.match.team2_bat_inns
        expected = [{self.team1[0]: ["0", "0", "0", "4"]}]
        self.assertEqual(actual, expected)

    # def test_add_ball_new_bowler_unfinished_over(self):
