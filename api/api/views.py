from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

import pandas as pd
import json
import joblib as jl

city_names = {
    "2": "Delhi",
    "7": "Bhopal",
    "8": "Kanpur",
    "9": "Nagpur",
    "12": "Chandigarh",
    "14": "Ahmedabad",
    "16": "Chennai",
    "19": "Madurai",
    "21": "Faridabad",
    "23": "Ghaziabad",
    "24": "Lucknow",
    "25": "Surat",
    "26": "Hyderabad",
    "27": "Gandhinagar",
    "28": "Mumbai",
    "29": "Chandigarh",
    "30": "Amritsar"
}

@csrf_exempt
def get_data(request):
    if request.method == 'POST':
        model = jl.load("C:/Team Hacking For the Future/api/api/model.joblib")
        user = json.loads(request.body)
        data = pd.read_csv("C:/Hackathon/data2.csv")
        X = data.drop("Center", axis=1)
        y = data["Center"]
        categorical_features = ["Location", "Blood Group", "Disease", "Gender"]
        one_hot = OneHotEncoder()
        transformer = ColumnTransformer([(
            "one_hot",
            one_hot,
            categorical_features)],
            remainder="passthrough"
        )
        transformer.fit_transform(X)
        user_data = {
            "Age": user["Age"],
            "Weight (in kg)": user["Weight"],
            "Height (in cm)": user["Height"],
            "Location": user["Location"],
            "Blood Group": user["Blood Group"],
            "Disease": user["Disease"],
            "Stage": user["Stage"],
            "Cancer": user["Cancer"],
            "Gender": user["Gender"]
        }
        user_df = pd.DataFrame(user_data, index=[0])
        user_data_transformed = transformer.transform(user_df)
        disease = user["Disease"]
        res = round(model.predict(user_data_transformed)[0])
        user_city = user_data["Location"]
        pred_city = ""
        for i in city_names:
            if (i == str(res)):
                pred_city = city_names[i]
        print(res)
        to_return = {
            "Result": res,
            "Disease": disease,
            "City": pred_city
        }

        return JsonResponse(to_return, safe=False)