import { SupabaseService } from "../services/supabase/supabase.service";

export default class RouteUtil {

    static createCategoryUrl(categoryId: string) {
        return `category/${categoryId}`;
    }
}
