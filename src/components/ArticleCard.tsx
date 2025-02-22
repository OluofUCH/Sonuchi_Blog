
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string,
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  className?: string;
}

const ArticleCard = ({ id, image, category, title, excerpt, date, className = "" }: ArticleCardProps) => {
  return (
    <article className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl ${className}`}>
      <Link to={`/post/${id}`} className="block">
        <div className="relative aspect-[20/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
              {category}
            </span>
            <button className="rounded-full bg-white/90 p-2 text-gray-900 backdrop-blur-sm transition-transform duration-300 hover:scale-110">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-700">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 break-words prose">{excerpt}</p>
          <time className="text-xs text-gray-500">{date}</time>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
