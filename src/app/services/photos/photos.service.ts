import { Injectable } from '@angular/core';
import { NetworkService } from '../common/network.service';
import { Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../types/database.types';
import { PHOTOS_TABLE, SELECT_ALL } from '../../constants/superbase/superbase.tables.constant';

@Injectable({
  providedIn: 'root'
})
export class PhotosService extends NetworkService {

  constructor(private supabaseService: SupabaseService) {
    super();
   }
  
  /**
   * Method to get photos table data from supabase tables
   * 
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override get() {
    return this.supabaseService.get<QueryData<Tables<'photos'>>>(PHOTOS_TABLE, SELECT_ALL);
  }  

  /**
   * Method to get photos table data changes from supabase tables
   * 
   * @returns Observable data {@link Observable}
   */
  override getChanges(): Observable<any> {
    return this.supabaseService.getChanges(PHOTOS_TABLE, SELECT_ALL);
  }

  /**
   * Method to find photos table data from supabase based on id
   * 
   * @param value id of the table that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override find(value: any): any {
    return this.supabaseService.find<QueryData<Tables<'photos'>>>(PHOTOS_TABLE, SELECT_ALL, "categoryId", value);
  }

  override insert() {
    throw new Error('Method not implemented.');
  }

  override getImage() {
    throw new Error('Method not implemented.');
  }

  override update() {
    throw new Error('Method not implemented.');
  }
}
