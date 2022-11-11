import { Achievement, NewUser, User } from './types';

export const POPULATE_USER = (user: User | NewUser): User => {
  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'Getting wordly',
      description: 'Played your first wordle',
      complete: false,
    },
    {
      id: 2,
      name: 'Getting wordly',
      description: 'Played 5 wordles',
      complete: false,
    },
    {
      id: 3,
      name: 'Getting wordly',
      description: 'Played 10 wordles',
      complete: false,
    },
    {
      id: 4,
      name: 'Getting wordly',
      description: 'Played 25 wordles',
      complete: false,
    },
    {
      id: 5,
      name: 'Getting wordly',
      description: 'Played 50 wordles',
      complete: false,
    },
    {
      id: 6,
      name: 'Getting wordly',
      description: 'Played 100 wordles',
      complete: false,
    },
    {
      id: 7,
      name: 'Streaking',
      description: 'Complete 5 wordles in a row',
      complete: false,
    },
    {
      id: 8,
      name: 'Streaking',
      description: 'Complete 10 wordles in a row',
      complete: false,
    },
    {
      id: 9,
      name: 'Streaking',
      description: 'Complete 25 wordles in a row',
      complete: false,
    },
    {
      id: 10,
      name: 'Streaking',
      description: 'Complete 50 wordles in a row',
      complete: false,
    },
    {
      id: 11,
      name: 'Streaking',
      description: 'Complete 100 wordles in a row',
      complete: false,
    },
    {
      id: 12,
      name: 'Hard luck',
      description: 'Failed a wordle',
      complete: false,
    },
    {
      id: 13,
      name: 'Wordle in 1',
      description: 'Complete a wordle in 1 guess',
      complete: false,
    },
    {
      id: 14,
      name: 'Wordle in 2',
      description: 'Complete a wordle in 2 guesses',
      complete: false,
    },
    {
      id: 15,
      name: 'Wordle in 3',
      description: 'Complete a wordle in 3 guesses',
      complete: false,
    },
    {
      id: 16,
      name: 'Triple wordle',
      description: 'Complete 3 wordles in a row with 3 guesses or less',
      complete: false,
    },
    {
      id: 17,
      name: 'Completed all achievements',
      description: "You've completed all the achievements!",
      complete: false,
    },
  ];

  const USER: User = {
    userId: '',
    usernames: [],
    wordlesCompleted: 0,
    wordlesFailed: 0,
    totalWordles: 0,
    percentageCompleted: 0,
    percentageFailed: 0,
    completionGuesses: [],
    averageGuesses: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastGameNumber: 0,
    bestScore: 0,
    scores: [0, 0, 0, 0, 0, 0],
    achievements: [...achievements],
    firstWordleDate: new Date().getTime(),
  };

  // simple type guard
  const wordlesCompleted = 'wordlesCompleted' in user;

  if (wordlesCompleted) {
    const currAchievements = user.achievements;

    // loop through achievements constant
    achievements.forEach((element) => {
      // does the user achievements include achievement being looped over?
      const found = currAchievements.find(
        (achievement) => achievement.id === element.id,
      );

      // if it doesn't find it we should add it to the user achievements
      if (!found) {
        currAchievements.push(element);
      }
    });

    return {
      userId: user.userId,
      usernames: [...user.usernames],
      wordlesCompleted: user.wordlesCompleted,
      wordlesFailed: user.wordlesFailed,
      totalWordles: user.totalWordles,
      percentageCompleted: user.percentageCompleted,
      percentageFailed: user.percentageFailed,
      completionGuesses: user.completionGuesses,
      averageGuesses: user.averageGuesses,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      lastGameNumber: user.lastGameNumber,
      bestScore: user.bestScore,
      scores: user.scores,
      achievements: currAchievements,
      // potentially remove the ?? when everyone has a firstWordleDate
      firstWordleDate: user.firstWordleDate ?? new Date().getTime(),
    };
  }
  return {
    ...USER,
    userId: user.userId,
    usernames: [...user.usernames],
    achievements: [...achievements],
  };
};

export const SERVER_LIMIT = 10;

export const DEFAULT_NOTIFICATIONS = {
  achievements: true,
  limits: true,
};

export const EXPORT_DATA_TEXT = (id: string) =>
  `Follow this [link](https://wordle-discord-bot-fe.vercel.app/api/export/${id}) to get your servers current data in JSON format`;

export const LIMIT_REACHED =
  "You've reached the limit for this server. Delete some users to allow more or consider upgrading to premium.";

export const UPGRADE_SERVER = (id: string) =>
  `Click [here](https://wordlediscordbot.com/upgrade/${id}) to upgrade your server to allow more users.`;

export const SET_WORDLE_ADMIN_ROLE = (role: string) => {
  if (!role) return 'Opps, something went wrong';
  return `You have set the wordle admin role to **${role}**`;
};

export const PURGE_USER = (user: string) =>
  `You have purged **${user}** from the database`;

export const COMPLETED_ALREADY_TEXT = (lastGameNumber: string) =>
  `Not so fast, you have already completed this wordle! Your last completed wordle was ${lastGameNumber}`;

export const INVALID_SCORE_TEXT =
  'That score seems to be invalid, make sure it follows the form of `X/6` or `1-6/6`';

export const NOT_PLAYED_TEXT = 'You have not played any wordles yet!';

export const SOMETHING_WENT_WRONG_TEXT =
  'Oops, something went wrong. Please try again. If this continues please contact the bot owner @ https://wordlediscordbot.com/';

export const BANNER_IMAGE = 'https://i.imgur.com/iK5igVK.png';

export const THUMBNAIL_IMAGE =
  'https://cdn.discordapp.com/app-icons/1032088952116609055/307c23e55b3e11a56130e58507892b7b.png?size=256';

export const NO_LEADERBOARD_DATA = 'No leaderboard data yet!';

export const NO_PERMISSION_TEXT = 'You do not have permission to do that!';

export const COMMANDS = [
  {
    name: 'Set Channel ```/set-channel```',
    description: 'Sets the current channel as the wordle channel',
    permissions: 'admin',
  },
  {
    name: 'Set Role ```/set-role <@role>```',
    description: 'Sets a role as the wordle admin role',
    permissions: 'admin',
  },
  {
    name: 'Purge User ```/purge-user <@user>```',
    description: 'Purges a user from the database',
    permissions: 'admin',
  },
  {
    name: 'Reset Users ```/reset-users```',
    description: 'Resets all users',
    permissions: 'admin',
  },
  {
    name: 'Reset Leaderboard ```/reset-leaderboard```',
    description: 'Resets the leaderboard',
    permissions: 'admin',
  },
  {
    name: 'Server Status ```/server-status```',
    description: 'Shows the current status of the server',
    permissions: 'admin',
  },
  {
    name: 'Upgrade Server ```/upgrade-server```',
    description: 'Provides a link to upgrade server',
    permissions: 'admin',
  },
  {
    name: "Enable Notifications ```/enable-notifications <'achievements', 'limits'>```",
    description: 'Enable notifications for all, achievements, or limits',
    permissions: 'admin',
  },
  {
    name: "Disable Notifications ```/disable-notifications <'achievements', 'limits'>```",
    description: 'Disable notifications for all, achievements, or limits',
    permissions: 'admin',
  },

  {
    name: 'My Stats ```/my-stats```',
    description: 'Shows your stats',
    permissions: 'all',
  },
  {
    name: 'My Achievements ```/my-achievements```',
    description: 'Shows your achievements',
    permissions: 'all',
  },
  {
    name: 'Leaderboard ```/leaderboard```',
    description: 'Shows the leaderboard',
    permissions: 'all',
  },
  {
    name: 'Help ```/help```',
    description: 'Shows all the commands',
    permissions: 'all',
  },
];
