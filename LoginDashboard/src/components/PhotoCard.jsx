import { Camera } from "lucide-react";

function PhotoCard({ photo }) {
    // Replace broken via.placeholder.com domain with placehold.co
    const imageUrl = photo?.thumbnailUrl?.replace(
        "via.placeholder.com",
        "placehold.co"
    );

    return (
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full group hover:border-indigo-200">
            <div className="relative overflow-hidden aspect-square bg-slate-100">
                <img
                    src={imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/150x150?text=No+Image";
                    }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
                    <Camera className="w-3 h-3" />
                    <span>#{photo.id}</span>
                </div>
            </div>
            <div className="p-4">
                <p className="text-slate-600 text-sm font-semibold line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors capitalize">
                    {photo.title}
                </p>
            </div>
        </div>
    );
}

export default PhotoCard;