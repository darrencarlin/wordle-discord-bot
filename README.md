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
    currentStreak: 0,
    longestStreak: 0,
    bestScore: 0,
    scores: [0, 0, 0, 0, 0, 0],
    achievements: [{id: 1, name: "First Wordle", description: "You completed your first wordle"}],
  },
];

```

Each guild has it's own users collection in the database. which follows the below schema

```
{
  users: [User, User, User],
  channelId: "123456789",
  guildId: "123456789",
  name: "my server",
}
```

## Slash Commands

The bot currently has 4 slash commands.

- /set-channel
- /leaderboard
- /stats
- /achievements

/set-channel sets the channel to track wordle entries in. It will only track entries in this channel.

/leaderboard displays a leaderboard that includes all users who have made an entry.

<img width="972" alt="Screen Shot 2022-10-28 at 2 35 47 AM" src="https://user-images.githubusercontent.com/30006190/198519851-adbbdd73-e1e0-4aa4-9c5d-00aec26605fc.png">

/stats displays the users stats

<img width="199" alt="Screen Shot 2022-10-28 at 2 36 32 AM" src="https://user-images.githubusercontent.com/30006190/198519906-7f4e20e5-5093-4178-b39e-1bf7dc13304a.png">

/achievements displays the users achievements

<img width="354" alt="Screen Shot 2022-10-28 at 2 36 16 AM" src="https://user-images.githubusercontent.com/30006190/198520057-4492de5a-fc85-43d1-a4b4-d0afa641c16c.png">

## Planned/Potential New Features

- Purge a users data
- Better leaderboard sorting (Joint positioning)
- ~~Stop users from entering the same wordle twice~~
- ~~Allow ephemeral stats~~
- ~~Achievements~~
- ~~Streak tracking `{currentStreak: 0, longestStreak: 0, lastGame: ""}`~~
- ~~Best score tracking `{bestScore: 0}`~~
- ~~General score tracking `{scores: [0,0,0,1,0,0]}`~~
