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
}
