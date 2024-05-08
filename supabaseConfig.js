const  { createClient }  = require('@supabase/supabase-js')
const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const uploadFunction = async(fileName, fileBuffer, mimetype)=>{
    try {
        const { data, error } = await supabase.storage.from('itemimages').upload(fileName,fileBuffer, {
          contentType: mimetype,
          cacheControl: '3600',
        }); 
        if (error) {
            throw error
        }     
        return data
      } catch (error) {
        throw error
      }
}


module.exports = uploadFunction