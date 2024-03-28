import { Injectable } from '@angular/core';
import {
  createClient,
  RealtimePostgresChangesPayload,
  SupabaseClient } from '@supabase/supabase-js'
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
   * Method to get data changes for the specified table from supabase
   * 
   * @param tableName Table to subscribe for any changes
   * @param event Event such as INSERT, UPDATE, DELETE 
   * @returns Payload {@link RealtimePostgresChangesPayload}
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
}