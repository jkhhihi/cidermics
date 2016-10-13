// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "당신의 지식을 테스트해보세요.",
        "main":    "<p>당신은 충분히 경제 지식이 많다고 생각하나요? 한번 도전해보세요!</p>",
        "results": "<h5>Learn More</h5><p>Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus.</p>",
        "level1":  "Jeopardy Ready 111",
        "level2":  "Jeopardy Contender 222",
        "level3":  "Jeopardy Amateur 333",
        "level4":  "Jeopardy Newb  444",
        "level5":  "Stay in school, kid... 555" // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "급격히 증가했던 생산가능 인구가 고령화되면서 인구 가운데 생산가능인구가 차지하는 비중이 줄어 경제성장이 둔화되는 현상은??",
            "a": [
                {"option": "고령화 사회",      "correct": false},
                {"option": "인구보너스",     "correct": false},
                {"option": "인구오너스",      "correct": true},
                {"option": "인구멜서스",     "correct": false} // no comma here
            ],
            "correct": "<p><span>That's right!</span> The letter A is the first letter in the alphabet!</p>",
            "incorrect": "<p><span>Uhh no.</span> It's the first letter of the alphabet. Did you actually <em>go</em> to kindergarden?</p>" // no comma here
        },
        { // Question 2 - Multiple Choice, Multiple True Answers, Select Any
            "q": "가공무역에서 자국으로 순수하게 입금되는 외화획득비율, 즉 ( )은 한 나라의 총수출액 중에서 실제로 가동하여 얻은 회화에 대한 백분율을 말한다.?",
            "a": [
                {"option": "외화획득비율",               "correct": false},
                {"option": "외화충분률",   "correct": true},
                {"option": "외화백분률",               "correct": false},
                {"option": "Eggs, fruit, toast, and milk", "correct": true} // no comma here
            ],
            "select_any": true,
            "correct": "<p><span>Nice!</span> Your cholestoral level is probably doing alright.</p>",
            "incorrect": "<p><span>Hmmm.</span> You might want to reconsider your options.</p>" // no comma here
        },
        { // Question 3 - Multiple Choice, Multiple True Answers, Select All
            "q": "Where are you right now? Select ALL that apply.",
            "a": [
                {"option": "Planet Earth",           "correct": true},
                {"option": "Pluto",                  "correct": false},
                {"option": "At a computing device",  "correct": true},
                {"option": "The Milky Way",          "correct": true} // no comma here
            ],
            "correct": "<p><span>Brilliant!</span> You're seriously a genius, (wo)man.</p>",
            "incorrect": "<p><span>Not Quite.</span> You're actually on Planet Earth, in The Milky Way, At a computer. But nice try.</p>" // no comma here
        },
        { // Question 4
            "q": "How many inches of rain does Michigan get on average per year?",
            "a": [
                {"option": "149",    "correct": false},
                {"option": "32",     "correct": true},
                {"option": "3",      "correct": false},
                {"option": "1291",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Holy bananas!</span> I didn't actually expect you to know that! Correct!</p>",
            "incorrect": "<p><span>Fail.</span> Sorry. You lose. It actually rains approximately 32 inches a year in Michigan.</p>" // no comma here
        },
        { // Question 5
            "q": "Is Earth bigger than a basketball?",
            "a": [
                {"option": "Yes",    "correct": true},
                {"option": "No",     "correct": false} // no comma here
            ],
            "correct": "<p><span>Good Job!</span> You must be very observant!</p>",
            "incorrect": "<p><span>ERRRR!</span> What planet Earth are <em>you</em> living on?!?</p>" // no comma here
        } // no comma here
    ]
};
