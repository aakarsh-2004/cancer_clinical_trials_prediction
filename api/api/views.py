from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from city import city_names

import pandas as pd
import json
import joblib as jl


# Disabling the CSRF protection set by django
@csrf_exempt
def get_data(request):
    if request.method == 'POST':
        # loading our previously model
        model = jl.load("C:/Team Hacking For the Future/api/api/model.joblib")

        # Getting data from frontend
        user = json.loads(request.body)

        # Reading the data csv file
        data = pd.read_csv("C:/Hackathon/data2.csv")
        
        # Separating X and y
        X = data.drop("Center", axis=1)
        y = data["Center"]

        # Defining OneHotEncoding so that user's input can be converted into the same format as that of our training dataset
        categorical_features = ["Location", "Blood Group", "Disease", "Gender"]
        one_hot = OneHotEncoder()
        transformer = ColumnTransformer([(
            "one_hot",
            one_hot,
            categorical_features)],
            remainder="passthrough"
        )
        transformer.fit_transform(X)

        # Defining the dictionary and making a pandas dataframe out of it
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

        # Now changing our input's parameter same as that of the training dataset
        user_data_transformed = transformer.transform(user_df)
        disease = user["Disease"]

        # Finally predicting the hospital/center with our pretrained model
        res = round(model.predict(user_data_transformed)[0])
        user_city = user_data["Location"]
        pred_city = ""
        for i in city_names:
            if (i == str(res)):
                pred_city = city_names[i]
        print(res)

        # Finally returning the desired parameters
        to_return = {
            "Result": res,
            "Disease": disease,
            "City": pred_city
        }

        return JsonResponse(to_return, safe=False)