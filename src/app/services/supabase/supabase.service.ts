import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../../../environment';
import { Database } from '../../types/database.types';
import { Subject } from 'rxjs';
import { IMAGES_PATH } from '../../constants/superbase/superbase.storage.constant';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey)
  }

  /**
   * Method to get data from supabase
   * 
   * @param tableName Table from which data should be fetched
   * @param query Query of the data
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  get<T>(tableName: any, query: any): any {
    return this.supabase.from(tableName).select(query).returns<T>();
  }

  /**
   * Method to find data from supabase
   * 
   * @param tableName Table from which data should be fetched
   * @param query Query of the data
   * @param column Column from the table which should be queried
   * @param value Value that the column should have
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  find<T>(tableName: any, query: any, column: any, value: any): any {
    return this.supabase.from(tableName).select(query).eq(column, value).returns<T>();
  }

  /**
   * Method to get data changes for the specified table from supabase
   * 
   * @param tableName Table to subscribe for any changes
   * @param event Event such as INSERT, UPDATE, DELETE 
   * @returns Payload
   */
  getChanges(tableName: any, event: any): any {
    const changes = new Subject();
    this.supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: event,
        schema: 'public',
        table: tableName
      },
      (payload) => changes.next(payload)
    )
    .subscribe()

    return changes.asObservable();
  }

  getImage(path: any): any {
    return this.supabase.storage.from(IMAGES_PATH).getPublicUrl(path);
  }

  /**
   * Method to update the table
   * 
   * @param tableName Table to update
   * @param newData New data to add
   * @param column Column name to find the row to update
   * @param value Value of the column
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  update<T>(tableName: any, newData: any, column: any, value: any): any {
    return this.supabase.from(tableName).update(newData).eq(column, value).select().returns<T>();
  }

  /**
   * Method to insert into the table
   * 
   * @param tableName Table to update
   * @param newData New data to add
   * @returns Data {@link T} Should be of type {@link QueryResult} or {@link QueryData}
   */
  insert<T>(tableName: any, newData: any): any {
    return this.supabase.from(tableName).insert(newData).select().returns<T>();
  }
}
