import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { UseFormReturn } from "react-hook-form";

// Interface define karo props ke liye
interface Member {
  username: string;
}

interface MembersListProps {
  groupData: {
    members: Member[];
  };
}

function MembersList({ groupData }: MembersListProps) {

    

  return (
    <div className="space-y-2 mt-2">
      {groupData.members.map((member) => (
        <FormField
          key={member.username}
          name="splitWith"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value?.includes(member.username)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, member.username])
                      : field.onChange(
                          field.value?.filter(
                            (value: string) => value !== member.username,
                          ),
                        );
                  }}
                  className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
              </FormControl>
              <FormLabel className="font-normal text-white text-sm flex items-center gap-2 cursor-pointer">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-zinc-800 text-xs text-white">
                    {member.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {member.username}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}

export default MembersList;
