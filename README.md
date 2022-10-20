# wordle-discord-bot

This discord bot tracks users wordle entries for a given discord channel.

It picks up the score from the first line of the share snippet you can copy when you complete a wordle on the [New York Times](https://www.nytimes.com/games/wordle/index.html).

It uses `4/6` from the screenshot below.

<img width="215" alt="Screen Shot 2022-10-19 at 10 43 15 PM" src="https://user-images.githubusercontent.com/30006190/196843865-4937c2b2-ad55-4c0a-9641-a418d4584484.png">

It store the users scores and stats using Google Firestore with the following schema

```
[
  {
    usernames: ["daz"],
    userId: "29287329372983729",
    wordlesCompleted: 1,
    wordlesFailed: 0,
    totalWordles: 1,
    percentageCompleted: 100,
    percentageFailed: 0,
    completionGuesses: [4],
    averageGuesses: 0,
  },
];

```

## Slash Commands

The bot has 2 slash commands.

- /leaderboard
- /stats

/leaderboard displays a leaderboard that includes all users who have made an entry.

<img width="684" alt="Screen Shot 2022-10-19 at 10 58 52 PM" src="https://user-images.githubusercontent.com/30006190/196846001-3391b8c8-a21b-4594-9f5a-ff2b77fac6c3.png">

/stats displays the users stats

<img width="325" alt="Screen Shot 2022-10-19 at 10 59 37 PM" src="https://user-images.githubusercontent.com/30006190/196846130-05d7cff4-73ef-4df5-9d36-7885672bd035.png">

## Planned/Potential New Features

- Better leaderboard sorting
- Streak tracking `{currentStreak: 0, longestStreak: 0, lastGame: ""}`
- Best score tracking `bestScore: 0`

## How to install

To install this bot on your server.

1. Setup discord bot/application and get the token, give the bot the following scopes and permissions.

   - bot
   - applications.commands
   - Administrator

2. Setup a Google Firebase account and activate your firestore instance.
3. Clone this repo and add the following env variables.

### ENV variables

```
DISCORD_TOKEN=xxx
CLIENT_ID=xxx
GUILD_ID=xxx
WORDLE_CHANNEL=xxx
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx
FIREBASE_MESSAGING_SENDER_ID=xxx
FIREBASE_APP_ID=xxx
```

4. Deploy the bot to a server of your choice (make sure you use the files in the dist folder)
