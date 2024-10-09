import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IComment } from "@/types/iblog";
import { fromNow } from "@/lib/date";

import { Edit2, Reply, Settings2 } from "lucide-react";
import { LucideTrash2 } from "lucide-react";
import Owner from "../shared/Owner";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";

const CommentCard = ({
  comment,
  setToReply,
  children,
  onDelete,
  onEdit,
}: {
  comment: IComment;
  setToReply: (toReply: IComment) => void;
  children?: React.ReactNode;
  onDelete: (id: string) => void;
  onEdit: (comment: IComment) => void;
}) => {
  return (
    <article
      className={`py-6 mb-6 text-base rounded-lg ${
        comment.parent_id ? " ml-6 lg:ml-12" : ""
      }`}
      id={`comment-${comment.id}`}
    >
      <footer className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Link
            className="inline-flex items-center text-sm"
            to={`/@/${comment.user?.username}`}
          >
            {/* <img
              className="w-6 h-6 mr-2 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            /> */}
            <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full text-secondary">
              <Avatar className="overflow-hidden rounded-full">
                <AvatarImage
                  src={comment?.user?.picture as string}
                  alt={`@${comment?.user?.username}`}
                  className="object-cover w-6 h-6"
                />
                <AvatarFallback>
                  {comment?.user?.username
                    .split(" ")
                    .map((part: string) => part.charAt(0).toUpperCase())}
                </AvatarFallback>
              </Avatar>
            </div>
            {comment.user?.username}
          </Link>

          <span className="mx-1.5">•</span>
          <p className="text-xs text-popover-foreground">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {fromNow(comment.created_at || new Date())}
            </time>
          </p>
        </div>
        <DropdownMenu>
          <Owner authorId={comment.user?.id || ""}>
            <DropdownMenuTrigger className="inline-flex items-center px-0.5 py-1 text-sm font-medium text-center text-muted bg-white rounded-lg hover:bg-muted focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-dark dark:hover:bg-dark dark:focus:ring-dark">
              <Settings2 className="h-5" />
              <span className="sr-only">Comment settings</span>
            </DropdownMenuTrigger>
          </Owner>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center space-x-0.5"
              onClick={() => onEdit(comment || "")}
            >
              <Edit2 className="h-[18px]" />
              <span className="text-sm">Editar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(comment.id || "")}
              className="flex items-center space-x-0.5"
            >
              <LucideTrash2 className="h-[18px]" />
              <span className="text-sm">Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>
      <p className="text-muted-foreground">{comment.content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <a
          className="flex items-center text-sm text-secodary-foreground hover:underline"
          onClick={() => setToReply(comment)}
          href="#comments"
        >
          <Reply className="mr-2" />
          <span>Reply</span>
        </a>
      </div>
      {children}
    </article>
  );
};

export default CommentCard;
