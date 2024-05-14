import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../types/database.types';
import { ABOUT_TABLE, SELECT_ALL } from '../../constants/superbase/superbase.tables.constant';
import { NetworkService } from '../common/network.service';
import { Observable } from 'rxjs';
import { ABOUT_PATH } from '../../constants/superbase/superbase.storage.constant';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends NetworkService {
  constructor(private supabaseService: SupabaseService) {
    super();
  }

  /**
   * Method to get about table data from supabase tables
   * 
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override get() {
    return this.supabaseService.get<QueryData<Tables<'work'>>>(ABOUT_TABLE, SELECT_ALL);
  }

  /**
   * Method to get about table data changes from supabase tables
   * 
   * @returns Observable data {@link Observable}
   */
  override getChanges(): Observable<any> {
    return this.supabaseService.getChanges(ABOUT_TABLE, SELECT_ALL);
  }

  /**
   * Method to get about image from supabase storage
   * 
   * @returns Public image url
   */
  override getImage(imageName: string) {
    return this.supabaseService.getImage(`${ABOUT_PATH}/${imageName}`);
  }


  /**
   * Method to find table data changes from supabase tables
   * 
   * @returns Observable data {@link Observable}
   */
  override find(): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
