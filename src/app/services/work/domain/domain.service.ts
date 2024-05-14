import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase/supabase.service';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../../types/database.types';
import { DOMAIN_TABLE, ID, SELECT_ALL } from '../../../constants/superbase/superbase.tables.constant';
import { DOMAIN_PATH } from '../../../constants/superbase/superbase.storage.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(private supabaseService: SupabaseService) { }

  /**
   * Method to find domain table data from supabase based on id
   * 
   * @param value id of the table that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  find(value: any) {
    return this.supabaseService.find<QueryData<Tables<'domain'>>>(DOMAIN_TABLE, SELECT_ALL, ID, value);
  }

  /**
   * Method to get domain table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  getChanges(): Observable<any> {
    return this.supabaseService.getChanges(DOMAIN_TABLE, SELECT_ALL);
  }

  /**
   * Method to get domain image from supabase storage
   * 
   * @returns Public image url
   */
  getImage(imageName: string): any {
    return this.supabaseService.getImage(`${DOMAIN_PATH}/${imageName}`);
  }
}
