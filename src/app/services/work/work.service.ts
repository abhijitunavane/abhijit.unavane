import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../types/database.types';
import { SELECT_ALL, WORK_TABLE } from '../../constants/superbase/superbase.tables.constant';
import { Observable } from 'rxjs';
import { WORK_PATH } from '../../constants/superbase/superbase.storage.constant';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private supabaseService: SupabaseService) { }

  /**
   * Method to get work table data from supabase tables
   * 
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  work() {
    return this.supabaseService.get<QueryData<Tables<'work'>>>(WORK_TABLE, SELECT_ALL);
  }

  /**
   * Method to get work table data changes from supabase tables
   * 
   * @returns Observable data {@link Observable}
   */
  workChanges(): Observable<any> {
    return this.supabaseService.getChanges(WORK_TABLE, SELECT_ALL);
  }

  /**
   * Method to get work image from supabase storage
   * 
   * @returns Public image url
   */
  workImage(imageName: string): any {
    return this.supabaseService.getImage(`${WORK_PATH}/${imageName}`);
  }
}
