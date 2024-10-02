// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'hire-matt';
// }

// app.component.ts
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, RouterModule, RouterOutlet} from "@angular/router";

interface Job {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,
    //RouterOutlet,
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private fragment: string="";

  constructor(private route: ActivatedRoute) {
  }
  personalInfo = {
    name: 'MATTHEW MARTIN',
    location: 'Herndon, VA 20171',
    phone: '571-247-6010',
    email: 'matthewdeanmartin@gmail.com',
    github: 'https://github.com/matthewdeanmartin',
    summary: "I'm a python/dotnet software developer. Lapsed Secret Clearance. See long resume for keywords.",
    howMade: "Mixture of LLM and human code. Click here to see how I made this site.",
  };

  experience: Job[] = [
    {
      title: 'Tech Lead (Supervisor)',
      company: 'Artemis Consulting',
      period: '2019-',
      responsibilities: [
        'Support contract for US Copyright Office',
        'Wrote significant amounts of code in Python, TypeScript, Gitlab build scripts, Terraform code in all areas of the application.',
        'Led technical team to deliver the Public Record copyright search engine to production, starting from a greenfield application.',
        'Supervisor for 3-5 subordinates, mostly software developers. Conducted technical interviews, wrote tickets, set quality standards, filled skill gaps, retained core dev team for five years.',
        'Maintained good relationships with client. Participated and complied with all areas of Scrum and SAFe software methodology.'
      ]
    },
    {
      title: 'Systems Architect',
      company: 'ASRC',
      period: '2019-2019',
      responsibilities: [
        'Support contract for USPTO',
        'Participate in various proof of concepts for docker, kiosks, RPA, Azure Chatbots.'
      ]
    },
    {
      title: 'Software Developer (Supervisor)',
      company: 'Burson Marsteller',
      period: '2016-2019',
      responsibilities: [
        'Supervisor for 2-5 software developers.',
        'Maintenance development on legacy marketing and public relations analytics apps.'
      ]
    },
    {
      title: 'Senior Software Engineer',
      company: 'Forsmarsh',
      period: '2014-2016',
      responsibilities: [
        'Support contracts for NIST and Veteran\'s Administration',
        'Worked with .NET and Python'
      ]
    },
    {
      title: 'Software Developer',
      company: 'CACI',
      period: '2012-2014',
      responsibilities: [
        'Support contract for Department of Defense at the Pentagon (Secret Clearance)',
        'Maintenance developer for a Javascript, Telerik and ASP.NET hybrid front end.'
      ]
    },
    {
      title: 'Senior Consultant',
      company: 'Procentrix',
      period: '2008-2012',
      responsibilities: [
        'Support contract for TSA (Public Trust)',
        'Maintenance developer for a ASP.NET and SQL Server application'
      ]
    },
    {
      title: 'DBA/Software Developer III',
      company: 'DRC',
      period: '2005-2008',
      responsibilities: [
        'Support contracts for USAF and NARA (Secret Clearance)',
        'SQL Server DBA tasks as well as application development tasks in C#, ASP, ASP.NET'
      ]
    },
    {
      title: 'Systems Developer I',
      company: 'Prince William County',
      period: '1998-2005',
      responsibilities: [
        'Worked as a Systems Developer for Prince William County'
      ]
    }
  ];

  skills = [
    'Expert: Python, C#, TypeScript, Javascript. Good enough: Java. Legacy: VB6, VBA, VB.NET. Willing to learn: Rust, Go, PHP, Ruby',
    'Ops: SQL Server, Postgres, REDIS, Opensearch, Bash, Terraform, Docker',
    'Cloud: AWS EC2, ECS, ECR, RDS, API Gateway, ALB, DynamoDB, SQS, some Azure',
  ];

  education = [
    {
      degree: 'Masters of Economics',
      institution: 'University of Akron, Ohio',
      period: '1996-1998',
    },
    {
      degree: 'BSBA Finance',
      institution: 'University of Akron, Ohio',
      period: '1990-1996',
    },
  ];

  showHireDialog = false;
  newJob: Partial<Job> = {};

  fireFromPosition(index: number) {
    if (index === 0) {
      const today = new Date().toISOString().split('T')[0];
      this.experience[index].period = `${this.experience[index].period.split('-')[0]}-${today}`;
    } else {
      this.experience.splice(index, 1);
    }
  }

  openHireDialog() {
    this.showHireDialog = true;
    this.newJob = {};
  }

  closeHireDialog() {
    this.showHireDialog = false;
  }

  hire() {
    const today = new Date().toISOString().split('T')[0];
    const newJob: Job = {
      title: this.newJob.title || '',
      company: this.newJob.company || '',
      period: `${today}-Present`,
      responsibilities: [],
    };
    this.experience.unshift(newJob);
    this.closeHireDialog();
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const candidate = document.querySelector('#' + fragment);
        if (candidate){
          candidate.scrollIntoView();
        }
      }
    });
  }
}
