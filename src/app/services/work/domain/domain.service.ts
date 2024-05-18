import { Injectable } from '@angular/core';
import { SupabaseService } from '../../supabase/supabase.service';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../../types/database.types';
import { DOMAIN_TABLE, ID, SELECT_ALL } from '../../../constants/superbase/superbase.tables.constant';
import { DOMAIN_PATH } from '../../../constants/superbase/superbase.storage.constant';
import { Observable } from 'rxjs';
import { NetworkService } from '../../common/network.service';
import { ProjectService } from './project/project.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService extends NetworkService {

  constructor(private supabaseService: SupabaseService, private projectService: ProjectService) {
    super();
   }

  override get() {
    throw new Error('Method not implemented.');
  }

  /**
   * Method to find domain table data from supabase based on id
   * 
   * @param value id of the table that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override find(value: any) {
    return this.supabaseService.find<QueryData<Tables<'domain'>>>(DOMAIN_TABLE, SELECT_ALL, ID, value);
  }

  /**
   * Method to get domain table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  override getChanges(): Observable<any> {
    return this.supabaseService.getChanges(DOMAIN_TABLE, SELECT_ALL);
  }

  /**
   * Method to get domain image from supabase storage
   * 
   * @returns Public image url
   */
  override getImage(imageName: string): any {
    return this.supabaseService.getImage(`${DOMAIN_PATH}/${imageName}`);
  }

  /**
   * Method to get domain table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  override update(newData: any, column: any, value: any): any {
    return this.projectService.update(newData, column, value);
  }

  override insert() {
    throw new Error('Method not implemented.');
  }
}
