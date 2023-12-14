class HSRFood:
    name: str
    category: str
    energy: float
    saturated_fat: float
    total_sugars: float
    sodium: float
    concentrated_fnvl: float
    fnvl: float
    fibre: float
    protein: float
    

    def __init__(
        self,
        name: str,
        category: str,
        energy: float,
        saturated_fat: float,
        total_sugars: float,
        sodium: float,
        concentrated_fnvl: float,
        fnvl: float,
        fibre: float,
        protein: float,
        ):
        self.name = name
        self.category = category
        self.energy = energy
        self.saturated_fat = saturated_fat
        self.total_sugars = total_sugars
        self.sodium = sodium
        self.fibre = fibre
        self.protein = protein
        self.concentrated_fnvl = concentrated_fnvl
        self.fnvl = fnvl
        if concentrated_fnvl > 0 and fnvl == 0:
            self.is_all_fnvl_concentrated = True
        else:
            self.is_all_fnvl_concentrated = False
        self.fnvl_pulse = round(
            100
            * (fnvl + (2 * concentrated_fnvl))
            / (fnvl + (2 * concentrated_fnvl) + (100 - fnvl - concentrated_fnvl)),
            2,
        )

    def get_nutrient(self, nutrient):
        if nutrient == "energy":
            return self.energy
        elif nutrient == "saturated_fat":
            return self.saturated_fat
        elif nutrient == "total_sugars":
            return self.total_sugars
        elif nutrient == "sodium":
            return self.sodium
        elif nutrient == "concentrated_fnvl":
            return self.concentrated_fnvl
        elif nutrient == "fnvl":
            return self.fnvl
        elif nutrient == "fnvl_pulse":
            return self.fnvl_pulse
        elif nutrient == "fibre":
            return self.fibre
        elif nutrient == "protein":
            return self.protein