import operator
from hsr_food import HSRFood

# energy (kJ),saturated fat (g), total sugars(g), sodium(mg)
# fnvl (%), protein(g), fibre(g)
# HSR baseline points for categories 1D,2,2D
baseline_points_table_A = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "energy": [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350, 3685],
    "saturated_fat": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.2, 12.5, 13.9, 15.5, 17.3, 19.3, 21.6, 24.1, 26.9, 30.0, 33.5, 37.4, 41.7, 46.6, 52.0, 58.0, 64.7, 72.3, 80.6, 90.0],
    "total_sugars": [5.0, 8.9, 12.8, 16.8, 20.7, 24.6, 28.5, 32.4, 36.3, 40.3, 44.2, 48.1, 52.0, 55.9, 59.8, 63.8, 67.7, 71.6, 75.5, 79.4, 83.3, 87.3, 91.2, 95.1, 99.0],
    "sodium": [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260, 1350, 1440, 1530, 1620, 1710, 1800, 1890, 1980, 2070, 2160, 2250, 2340, 2430, 2520,2610, 2700]
}

# HSR baseline points for categories 3,3D
baseline_points_table_B = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    "energy": [335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350, 3685],
    "saturated_fat": [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0],
    "total_sugars": [5.0, 9.0, 13.5, 18.0, 22.5, 27.0, 31.0, 36.0, 40.0, 45.0],
    "sodium": [90, 180, 270, 360, 450, 540, 630, 720, 810, 900, 990, 1080, 1170, 1260, 1350, 1440, 1530, 1620, 1710, 1800, 1890, 1980, 2070, 2160, 2250, 2340, 2430, 2520, 2610, 2700]
}

# HSR baseline points for category 1
baseline_points_table_C = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "energy": [0, 31, 61, 91, 121, 151, 181, 211, 241, 271],
    "total_sugars": [0.1, 1.6, 3.1, 4.6, 6.1, 7.6, 9.1, 10.6, 12.1, 13.6]
}

# HSR V Points for categories 1D, 2, 2D, 3 and 3D
fnvl_points_table = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8],
    "concentrated_fnvl": [25, 43, 52, 63, 67, 80, 90, 100],
    "non_concentrated_fnvl": [40, 60, 67, 75, 80, 90, 95, 100]
}

# HSR V Points for caterogry 1
fnvl_points_table_category_1 = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "fnvl": [25, 33, 41, 49, 57, 65, 73, 81, 89, 96]
}

# HSR P and F Points
protein_fibre_points_table = {
    "points": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    "protein": [1.6, 3.2, 4.8, 6.4, 8.0, 9.6, 11.6, 13.9, 16.7, 20.0, 24.0, 28.9, 34.7, 41.6, 50.0],
    "fibre": [0.9, 1.9, 2.8, 3.7, 4.7, 5.4, 6.3, 7.3, 8.4, 9.7, 11.2, 13.0, 15.0, 17.3, 20.0],
}

eligible_fruit_vegetables = [
                'Watermelon',
                'Banana',
                'Avocado',
                'Apple',
                'Orange',
                'Mandarins orange',
                'Mango',
                'Jackfruit',
                'Cabbage',
                'Red cabbage',
                'Spinach',
                'Strawberry',
                'Tomato',
                'Cucumber',
                'Carrot',
                'Cauliflower',
                'Broccoli',
                'Grape',
                'Pear',
                'Peach',
]

health_star_rating_table = {
    "rating": [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5],
    "category 1D": [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
    "category 2": [-11, -7, -2, 2, 6, 11, 15, 20, 24, 25],
    "category 2D": [-2, 0, 2, 3, 5, 7, 8, 10, 12, 13],
    "category 3": [13, 16, 20, 23, 27, 30, 34, 37, 41, 42],
    "category 3D": [24, 26, 28, 30, 31, 33, 35, 37, 39, 40],
}

health_star_rating_table_category_1 = {
    "rating": [4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5],
    "category 1": [0, 1, 3, 5, 7, 9, 11, 12],
}


def lookup_table(val, op1, op2, table, points, criteria):
    ops = {
        ">": operator.gt,
        "<": operator.lt,
        ">=": operator.ge,
        "<=": operator.le,
        "==": operator.eq
    }
    for idx, (pt, criterion) in enumerate(zip(table[points], table[criteria])):
        if ops[op1](val, criterion):
            return pt
    if ops[op2](val, criterion):
        if points == "points":
            pt = table[points][idx + 1]
        elif points == "rating":
            pt = table[points][idx]
    return pt


def get_baseline_points(food):
    total = 0
    if food.category in ("1D", "2", "2D"):
        tab = baseline_points_table_A
    elif food.category in ("3", "3D"):
        tab = baseline_points_table_B
    for nutrient in ("energy", "saturated_fat", "total_sugars", "sodium"):
        pt = lookup_table(food.get_nutrient(nutrient), "<=", ">", tab, "points", nutrient)
        total += pt
    return total


def get_baseline_points_category_1(food):
    total = 0
    for nutrient in ("energy", "total_sugars"):
        pt = lookup_table(food.get_nutrient(nutrient), "<=", ">", baseline_points_table_C, "points", nutrient,)
        total += pt
    return total


def get_HSR_V_points(food):
    pt = 0
    if food.is_all_fnvl_concentrated == True:
        pt = lookup_table(food.get_nutrient("fnvl_pulse"), "<", "==", fnvl_points_table, "points", "concentrated_fnvl")
    else:
        pt = lookup_table(food.get_nutrient("fnvl_pulse"), "<=", "==", fnvl_points_table, "points", "non_concentrated_fnvl")
    return pt


def get_HSR_V_points_category_1(food):
    pt = 0
    pt = lookup_table(food.get_nutrient("concentrated_fnvl"), "<", ">=", fnvl_points_table_category_1, "points", "fnvl")
    return pt


def get_HSR_P_points(food, total_baseline_points, modifying_fnvl_points):
    pt = 0
    if total_baseline_points < 13 or (total_baseline_points >= 13 and modifying_fnvl_points >= 5):
        for pt, criterion in zip(protein_fibre_points_table["points"], protein_fibre_points_table["protein"]):
            if criterion == 3.2 and food.protein < 3.2:
                break
            elif food.protein <= criterion:
                break
        if food.protein > criterion:
            pt += 1
    return pt


def get_HSR_F_points(food):
    pt = 0
    pt = lookup_table(food.get_nutrient("fibre"), "<=", ">", protein_fibre_points_table, "points", "fibre")
    return pt


def get_profiler_score(food):
    baseline_points = 0
    fnvl_points = 0
    protein_points = 0
    fibre_points = 0
    profiler_score = 0
    # category 1 is not eligible for HSR P and F points
    if food.category == "1":
        baseline_points = get_baseline_points_category_1(food)
        fnvl_points = get_HSR_V_points_category_1(food)
    # category 1D is not eligible for HSR F points
    elif food.category == "1D":
        baseline_points = get_baseline_points(food)
        fnvl_points = get_HSR_V_points(food)
        protein_points = get_HSR_P_points(food, baseline_points, fnvl_points)

    elif food.category in ("2", "2D", "3", "3D"):
        baseline_points = get_baseline_points(food)
        fnvl_points = get_HSR_V_points(food)
        protein_points = get_HSR_P_points(food, baseline_points, fnvl_points)
        fibre_points = get_HSR_F_points(food)
    profiler_score = baseline_points - fnvl_points - protein_points - fibre_points

    return profiler_score


def get_health_star_rating(food: HSRFood):
    sc = get_profiler_score(food)
    if food.category == "1":
        if food.name == "Water":
            health_star = 5.0
        elif food.name == "Unsweetened Flavoured Water":
            health_star = 4.5
        else:
            health_star = lookup_table(sc, "<=", ">=", health_star_rating_table_category_1, "rating", "category 1")
    elif food.category == "1D":
        health_star = lookup_table(sc, "<=", ">=", health_star_rating_table, "rating", "category 1D")
    elif food.category == "2":
        health_star = lookup_table(sc, "<=", ">=", health_star_rating_table, "rating", "category 2")
        for item in eligible_fruit_vegetables:
            if food.name == item:
                health_star = 5.0
    elif food.category == "2D":
        health_star = lookup_table(sc, "<=", ">=", health_star_rating_table, "rating", "category 2D")
    elif food.category == "3":
        health_star = lookup_table(sc, "<=", ">=", health_star_rating_table, "rating", "category 3")
    elif food.category == "3D":
        health_star = lookup_table(sc, "<=", ">=", health_star_rating_table, "rating", "category 3D")
    return health_star
