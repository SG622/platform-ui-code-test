import { Component, OnInit } from '@angular/core';

export interface ProviderModel {
  id: string;
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders: ProviderModel[] = [];
  public unselectedProviders: ProviderModel[]  = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];
  public storage;

  constructor() {}

  ngOnInit() {
    this.storage = window.sessionStorage;
    if (this.storage) {
       this.selectedProviders = JSON.parse(this.storage.getItem('selected')) || this.selectedProviders; 
       this.unselectedProviders = JSON.parse(this.storage.getItem('unselected')) || this.unselectedProviders;
    }
  }

  selectProvider(item: ProviderModel, idx: number): void {
    this.selectedProviders.push(item);
    this.unselectedProviders.splice(idx, 1);
    this.storeStorage();
  }

  removeProvider(item: ProviderModel, idx: number): void {
    this.unselectedProviders.push(item);
    this.selectedProviders.splice(idx, 1);
    this.storeStorage();
  }

  storeStorage(): void {
    this.storage.setItem('selected', JSON.stringify(this.selectedProviders));
    this.storage.setItem('unselected',JSON.stringify(this.unselectedProviders));
  }
}
