import { SlashCommandBuilder } from '@discordjs/builders';

const purgeUserCommand = new SlashCommandBuilder()
  .setName('purge-user')
  .setDescription("Purges a user's stats")
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('The user you want to purge')
      .setRequired(true),
  );

export default purgeUserCommand.toJSON();
