import { Observable } from "rxjs";

export abstract class NetworkService {

  /**
   * Method to get table data from supabase tables
   * 
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  abstract get(): any;

  /**
   * Method to get table data changes from supabase tables
   * 
   * @returns Observable data {@link Observable}
   */
  abstract getChanges(): Observable<any>;

  /**
   * Method to get table data changes from supabase tables
   * 
   * @param value value that needs to be found
   * @returns Observable data {@link Observable}
   */
  abstract find(value: any): any;

  /**
   * Method to get image from supabase storage
   * 
   * @param imageName image name 
   * @returns Public image url
   */
  abstract getImage(imageName: string): any;

  /**
   * Method to update the table
   * 
   * @param newData New data to add
   * @param column Column name to find the row to update
   * @param value Value of the column
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  abstract update(newData: any, column: any, value: any): any;

  /**
   * Method to insert into the table
   * 
   * @param newData New data to insert
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  abstract insert(newData: any): any;
}
