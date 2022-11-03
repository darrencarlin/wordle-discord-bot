import { SlashCommandBuilder } from '@discordjs/builders';

const disableNotifications = new SlashCommandBuilder()
  .setName('disable-notifications')
  .setDescription('Disable notifications for all, achievements, or limits')
  .addStringOption((option) =>
    option
      .setName('type')
      .setDescription('The type of notifications to disable')
      .setRequired(true)
      .addChoices(
        {
          name: 'Achievement Notifications',
          value: 'achievements',
        },
        {
          name: 'Server Limit Notifications',
          value: 'limits',
        },
      ),
  );

export default disableNotifications.toJSON();
