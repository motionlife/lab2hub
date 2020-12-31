import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import { ICommandPalette } from '@jupyterlab/apputils';


/**
 * Initialization data for the JupyterHub.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'lab2hub-menu',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
  ) => {
    const { commands } = app;

    // Add a command
    const cmd2home = 'lab2hub:home';
    commands.addCommand(cmd2home, {
      label: 'Control Panel',
      caption: 'Navigate to the Control Panel on JupyterHub',
      execute: (args: any) => {
        location.assign(location.origin + '/home');
      }
    });

    const cmd2logout = 'lab2hub:logout';
    commands.addCommand(cmd2logout, {
      label: "Log Out",
      caption: "Logout doesn't shutdown the running instance",
      execute: (args: any) => {
        location.assign(location.origin + '/logout');
      }
    });

    // Add the 2 commands to the command palette
    const category = 'Extension by Motionlife';
    palette.addItem({command: cmd2home, category, args: { origin: "from the jupyterlab's palette" }});
    palette.addItem({command: cmd2logout, category, args: { origin: "from the jupyterlab's palette" }});

    // Create a menu
    const hubOpsMenu: Menu = new Menu({ commands });
    hubOpsMenu.title.label = 'Hub';
    mainMenu.addMenu(hubOpsMenu, { rank: 100 });

    // Add the 2 commands to the menu
    hubOpsMenu.addItem({ command: cmd2home, args: { origin: "from the jupyterlab's menu" } });
    hubOpsMenu.addItem({ command: cmd2logout, args: { origin: "from the jupyterlab's menu" } });
  }
};

export default extension;
