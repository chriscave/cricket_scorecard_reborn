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
        expected = {1: {self.team1[0]: ["1"]}}
        self.assertEqual(actual, expected)

    def test_add_ball_new_over(self):

        self.match.team2_bat_inns = {1: {self.team1[0]: ["0", "0", "0", "0", "0", "0"]}}
        self.match.add_ball(self.team1[1], "4")
        actual = self.match.team2_bat_inns
        expected = {
            1: {self.team1[0]: ["0", "0", "0", "0", "0", "0"]},
            2: {self.team1[1]: ["4"]},
        }
        self.assertEqual(actual, expected)

    def test_add_ball_current_over(self):
        self.match.team2_bat_inns = {1: {self.team1[0]: ["0", "0", "0"]}}
        self.match.add_ball(self.team1[0], "4")
        actual = self.match.team2_bat_inns
        expected = {1: {self.team1[0]: ["0", "0", "0", "4"]}}
        self.assertEqual(actual, expected)

    def test_add_ball_new_bowler_unfinished_over(self):
        self.match.team2_bat_inns = {1: {self.team1[0]: ["0", "0", "0"]}}
        with self.assertRaises(Exception) as context:
            self.match.add_ball(self.team1[1], "4")
        self.assertEqual(
            f"{self.team1[0].name} is the current bowler but {self.team1[1].name} was passed",
            str(context.exception),
        )

    def test_add_ball_same_bowler_new_over(self):
        self.match.team2_bat_inns = {1: {self.team1[0]: ["0", "0", "0", "0", "0", "0"]}}
        with self.assertRaises(Exception) as context:
            self.match.add_ball(self.team1[0], "4")
        self.assertEqual(
            f"{self.team1[0].name} bowled the last over so can not bowl a new over",
            str(context.exception),
        )
