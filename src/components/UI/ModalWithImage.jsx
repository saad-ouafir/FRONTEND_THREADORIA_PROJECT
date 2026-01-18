import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";

export default function ModalWithImage({ thread }) {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(thread?.images?.[0] || "");

  const handleOpen = () => setOpen(cur => !cur);
  const handleIsFavorite = () => setIsFavorite(cur => !cur);

  if (!thread) return null;

  const cover = thread.images?.[0]; // preview image
  const author = thread.author;

  return (
    <>
      {/* Clickable preview card */}
      <Card
        className="w-full max-w-md cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        {cover ? (
          <img alt="thread cover" className="h-56 w-full object-cover object-center" src={cover} />
        ) : (
          <div className="h-56 w-full bg-blue-gray-50 flex items-center justify-center">
            <Typography color="blue-gray" className="font-medium">
              No image
            </Typography>
          </div>
        )}

        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm" variant="circular" alt={author?.name || "user"} src={author?.avatar_url} />
            <div className="-mt-px flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-medium">
                {author?.name || "Unknown"}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs font-normal">
                @{author?.username || "unknown"}
              </Typography>
            </div>
          </div>

          <Typography className="mt-3 text-sm text-blue-gray-700 line-clamp-2">{thread.content}</Typography>
        </div>
      </Card>

      {/* Dialog */}
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="sm" variant="circular" alt={author?.name || "user"} src={author?.avatar_url} />
            <div className="-mt-px flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-medium">
                {author?.name || "Unknown"}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs font-normal">
                @{author?.username || "unknown"}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconButton variant="text" size="sm" color={isFavorite ? "red" : "blue-gray"} onClick={handleIsFavorite}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>

            <Button color="blue" size="sm" onClick={() => console.log("Share thread", thread.id)}>
              Share
            </Button>
          </div>
        </DialogHeader>

        <DialogBody className="space-y-4">
          {/* Thread content */}
          <Typography color="blue-gray" className="font-normal whitespace-pre-wrap">
            {thread.content}
          </Typography>

          {/* Main image */}
          {activeImage ? (
            <img
              alt="thread media"
              className="h-[32rem] w-full rounded-lg object-cover object-center"
              src={activeImage}
            />
          ) : null}

          {/* Thumbnails (if multiple images) */}
          {thread.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {thread.images.map(url => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActiveImage(url)}
                  className={`shrink-0 rounded-lg ring-2 transition ${
                    activeImage === url ? "ring-blue-500" : "ring-transparent"
                  }`}
                  title="View image"
                >
                  <img src={url} alt="thumbnail" className="h-16 w-24 rounded-lg object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </DialogBody>

        <DialogFooter className="justify-between">
          <div className="flex items-center gap-10">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Replies
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {thread.replies_count ?? 0}
              </Typography>
            </div>

            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Likes
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {thread.likes_count ?? 0}
              </Typography>
            </div>

            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Shares
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {thread.shares_count ?? 0}
              </Typography>
            </div>
          </div>

          <Button size="sm" variant="outlined" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
