import { Injectable } from '@angular/core';
import { NetworkService } from '../common/network.service';
import { Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';
import { ID, SELECT_ALL, VISITORS_TABLE } from '../../constants/superbase/superbase.tables.constant';
import { QueryData } from '@supabase/supabase-js';
import { Tables } from '../../types/database.types';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService extends NetworkService {

  constructor(private service: SupabaseService) {
    super();
  }

  override insert(newData: any) {
    return this.service.insert<QueryData<Tables<'visitors'>>>(VISITORS_TABLE, newData);
  }

  override update(newData: any, column: any, value: any) {
    return this.service.update(VISITORS_TABLE, newData, column, value);
  }

  override find(value: any) {
    return this.service.find<QueryData<Tables<'visitors'>>>(VISITORS_TABLE, SELECT_ALL, ID, value);
  }

  override get() {
    throw new Error('Method not implemented.');
  }

  override getChanges(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  override getImage() {
    throw new Error('Method not implemented.');
  }
}
