import { SlashCommandBuilder } from '@discordjs/builders';

const enableNotificationsCommand = new SlashCommandBuilder()
  .setName('enable-notifications')
  .setDescription('Enable notifications for all, achievements, or limits')
  .addStringOption((option) =>
    option
      .setName('type')
      .setDescription('The type of notifications to enable')
      .setRequired(true)
      .addChoices(
        {
          name: 'Achievement Notifications',
          value: 'achievements',
        },
        {
          name: 'Server Limits Notifications',
          value: 'limits',
        },
      ),
  );

export default enableNotificationsCommand.toJSON();
