import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PanelModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  recommendedActions = [
    {
      title: 'No Active Reports',
      description: 'You currently have no active reports.',
      buttonLabel: 'Create Report',
      icon: 'pi pi-plus-circle',
      action: () => this.createReport(),
      collapsed: false
    },
    {
      title: 'Account Setup',
      description: 'Complete your profile to enable full features.',
      buttonLabel: 'Complete Setup',
      icon: 'pi pi-user-edit',
      action: () => this.completeProfile(),
      collapsed: true
    },
    {
      title: 'Invite Team',
      description: 'Collaborate better by inviting your team members.',
      buttonLabel: 'Invite Now',
      icon: 'pi pi-users',
      action: () => this.inviteTeam(),
      collapsed: true
    },
    {
      title: 'Generate Summary',
      description: 'Create a summary of your latest campaign insights.',
      buttonLabel: 'Generate',
      icon: 'pi pi-chart-line',
      action: () => this.generateSummary(),
      collapsed: true
    }
  ];

  refreshActions() {
    // You can add logic here to refresh or fetch actions from a service
    console.log('Refreshing recommended actions...');
  }

  createReport() {
    console.log('Create Report clicked');
    // Route or modal open logic here
  }

  completeProfile() {
    console.log('Complete Setup clicked');
    // Route or modal open logic here
  }

  inviteTeam() {
    console.log('Invite Team clicked');
    // Route or modal open logic here
  }

  generateSummary() {
    console.log('Generate Summary clicked');
    // Route or modal open logic here
  }

}
