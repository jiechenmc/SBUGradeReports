import requests
import re

r = requests.get(
    "https://prof-comments.herokuapp.com/api/instructor/?name=Tripathi").json(
    )

GLOBAL = {
    "A": 0,
    "A-": 0,
    "B": 0,
    "B+": 0,
    "B-": 0,
    "C": 0,
    "C+": 0,
    "C-": 0,
    "D": 0,
    "D+": 0,
    "F": 0,
    "I": 0,
    "NC": 0,
    "P": 0,
    "W": 0,
}

pairs = []

for res in r:
    Grades = res["Grades"]
    if Grades != "[]":
        result = re.findall(r"\w+[\+\-]?", Grades)
        temp = {}

        for i in range(len(result)):
            if (i % 2 == 0):
                temp[result[i]] = 0
            else:
                temp[result[i - 1]] = int(result[i])

            if i == len(result) - 1:
                pairs.append(temp)
                temp = {}

for pair in pairs:
    for key in pair:
        GLOBAL[key] += pair[key]

print(sum(GLOBAL.values()))