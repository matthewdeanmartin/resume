from math import floor

coins = [0.01, 0.05, 0.10, .25, .50]


def make_change(price: float, cash: float):
    if cash < price:
        raise Exception("Not enough money")
    change = cash - price
    dollars = floor(change)
    remaining = round(change - dollars,2)
    change_coins = []

    for coin in reversed(coins):
        if remaining < 0:
            break
        # print(coin, remaining)
        if coin <= remaining:
            change_coins.append(coin)
            remaining -= coin
    return change_coins


print(make_change(5, 5.01))
print(make_change(5, 5.12))
print(make_change(5, 5.52))
