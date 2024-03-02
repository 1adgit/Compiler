import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Code2, Copy, Loader2, Save, Share2 } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { useSaveCodeMutation } from "@/redux/slices/api";
import { Icon } from "@radix-ui/react-select";
const HelperHeader = () => {
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );
  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const { urlId } = useParams();
  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else setShareBtn(false);
  });
  const handleSaveCode = async () => {
    try {
      const response = await saveCode(fullCode).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError;
    }
  };
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  return (
    <div className="_helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="_btn_container flex gap-1">
        <Button
          onClick={handleSaveCode}
          className="flex justify-center items-center gap-1"
          variant="success"
          disabled={isLoading}
          size="icon"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving
            </>
          ) : (
            <>
              <Save size={16} />
            </>
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary">
                <Share2 size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code2 size={24} />
                  Share your code
                </DialogTitle>
                <DialogDescription className="flex flex-col gap-2">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL copied to your cilpboard");
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-center">
                    Share this url with your friends to collaborate
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="_tab_switcher flex justify-center items-center gap-1">
        <small>Current Language</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
