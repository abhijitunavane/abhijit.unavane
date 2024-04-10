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

  constructor(private supbaseService: SupabaseService) { }

  /**
   * Method to get domain table data from supabase
   * 
   * @param value value that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  domain(value: any) {
    return this.supbaseService.find<QueryData<Tables<'domain'>>>(DOMAIN_TABLE, SELECT_ALL, ID, value);
  }

  /**
   * Method to get domain table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  domainChanges(): Observable<any> {
    return this.supbaseService.getChanges(DOMAIN_TABLE, SELECT_ALL);
  }

  /**
   * Method to get domain image from supabase storage
   * 
   * @returns Public image url
   */
  domainImage(imageName: string): any {
    return this.supbaseService.getImage(`${DOMAIN_PATH}/${imageName}`);
  }
}
