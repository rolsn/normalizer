# Normalizer

This is a small React app that allows researchers to configure and apply subscales for normalization of survey answers.

# Running

This is a React app served with a Vite dev server. Requires Node and npm installed on the host machine.

```
cd normalizer/
npm install
npm run dev
```

Then browse to http://localhost:5173/

## Steps to run

- Upload a normalization table in CSV format (`examples/normalization.csv`).
- Upload questions and answers files in JSON format (`examples/{questions.json|answers.json}`).
- Configure what subset of questions to consider for normalization (default is blank for all). Range is inclusive.
- Select the calculation method.
- Configure the age and sex of the respondent.

When all inputs have been accepted, the "calculate subscale" button will output the user's normalized score depending on the selected method (sum by default).

Example questions, answers, and normalization table files are included at the root of the project.

# Assumptions

- Questions and answers are JSON files.
- Normalization tables are CSV files and could be thousands of lines long (ages * raw values * 2 sexes).
	- Due to how large these files could potentially be, I've opted to load them into memory instead of persistent storage like LocalStorage which is limited to 5MB. This means they will have to be loaded again on page refresh.
- I've made a reasonable assumption as to how the JSON and CSV files are structured.
- The age and sex of the participant are not included in the answers, hence the requirement for configuring them separately.
- The normalization table lookup tries to match _exactly_ on age, sex and raw score.
- When looking up the raw score with an average, it will round to the nearest whole number.