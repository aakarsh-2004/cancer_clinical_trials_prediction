# Problem Statement
Nowadays cancer clinical trials are creating tremendous problem especially in India as cancer diagnosed patients are not aware of the trials/treatment happening in their or nearby cities.

**`Clinical Trials`** means the treatment programs which is offered sometimes by a hospital or sometimes by government's aid, these offer good medical facilities and they often promote individuals to get their health checked

# Introduction about the problem
As cancer is a very serious disease and it in any case should not be taken lightly, we figured out a machine learning model that tells the user the best cancer treatment hospital available as per one's disease, stage, gender etc.

# The Solution
We created a machine learning model that asks the following queries from user :
* Age
* Weight
* Height
* Location
* Blood Group
* Disease
* Stage
* Cancer(0/1)
* Gender

Using these parameters we trained a Scikit-Learn based machine learning model which predicts the best hospital or center that is available to a patient, the model's prediction is not always all accurate and it may give false output


# Technologies used:
**`Scikit-Learn`**, **`React`**, **`Django`**, **`Node`**, **`MongoDB`**

# Team Members:
* [Aakarsh Beohar](https://github.com/aakarsh-2004)
* [Anshika Beohar](https://github.com/anshika-b)
* [Abhishek Mishra](https://github.com/AbhiMishra-24)
* [Amisha Raj](https://github.com/amisha2208)

# Information about the project's directory

### Outer files
The **`data.csv`** file consists of all the data that the model is trained on, you may open to analyze the model further. 
`designed_model.ipynb` is the notebook file which is used for the complete data science part.
**Note**: OneHotEncoding is being used while training the model.

### The backend files
> You may need to install all the necessary dependencies
  
The folder `api` consists of the backend files which are created using `django` framework of python. 
To run the backend server, go one step into api and type

```
python manage.py runserver
```

Inside the subdir `api` of api, there is a `views` file in which all python function are written, they gets executed when the particular api is called.
To define those particular parameters we use `urls` file, all the links that are to be hitted and used are defined there.
Changing the `settings` file is generally not recommended if everything is working but if it's not then you may need to make the necessary changes to setup `cors`.
