import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

// Define the CLI version and description
program
  .version('1.0.0')
  .description('A CLI for handling config files and performing operations')
  .argument('<config>', 'path to the config JSON file')
  .action((configPath) => {
    // Check if the config file exists
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } else {
      console.error('Config file not found!');
    }
  });

// Parse the command line arguments
program.parse();