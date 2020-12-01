import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  exampleItems = [];
  tags = [];

  async selectAll() {
    try {
      console.log(environment.readAll);
      console.log('calling read all endpoint');

      this.exampleItems = [];
      const output = await fetch(environment.readAll);
      const outputJSON = await output.json();
      this.exampleItems = outputJSON;
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }

  async select(item: any) {
    try {
      console.log(environment.readId);
      console.log('calling read all endpoint');

      const output = await fetch(environment.readId+item, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const outputJSON = await output.json();
      this.tags = outputJSON;
      console.log('Success');
      console.log(outputJSON);
    } catch (error) {
      console.log(error);
    }
  }

  // really this is create but the flow is that
  // click the "create item" button which appends a blank value to the array, then click save to actually create it permanently
  async saveItem(item: any) {
    try {
      console.log(environment.create);
      // console.log('calling create item endpoint with: ' + item.tag);

      const requestBody = {
        tag: item.tag,
        synonym: item.synonym
      };

      const createResponse =
        await fetch(environment.create, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      console.log('Success');
      console.log(createResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(item:any) {
    try {
      console.log(environment.update);
      // console.log('calling update endpoint with id ' + item.tag + ' and value "' + item.synonym);
      console.log(item.tag)
      const requestBody = {
        tag: item.tag,
        synonym: item.synonym
      };

      const updateResponse =
        await fetch(environment.update+item.tag, {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      console.log('Success');
      console.log(updateResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(item: any) {
    try {
      console.log(environment.delete);
      console.log('calling delete endpoint with id ' + item);

      const deleteResponse =
        await fetch(environment.delete +item.tag, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json'
          }
        });

      console.log('Success');
      console.log(deleteResponse.status);

      // call select all to update the table
      this.selectAll();
    } catch (error) {
      console.log(error);
    }
  }

  createItem() {
    this.exampleItems.push({
      tag: '',
      synonym: '',
      save: true
    });
  }

}
