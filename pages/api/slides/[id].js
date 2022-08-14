import { supabase } from "../../../utils/supabaseClient";
import withAuth from "../../../utils/withAuth";

async function handler(req, res) {
    
    const { id } = req.query

    if (req.method === "DELETE") {
        const { data, error } = await supabase.from("slides").delete().eq("id", id)
        res.status(200).json({
            data,
            error
        })
    }
}

export default withAuth(handler)