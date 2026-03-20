import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Expense } from "@/types/globalTypes";
import React from "react";
interface Proptype {
  expense: Expense[];
}
function ExpensesList({ expense }: Proptype) {
  const { user } = useAuth();
  return expense.map((exp, index) => (
    <div key={index} className="flex gap-3 items-start">
      <Avatar className="w-11 h-11 flex-shrink-0 ring-2 ring-zinc-800">
        <AvatarImage src={exp.paidmemberAvatar} alt={exp.paidmemberUsername} />
        <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-white text-sm font-bold font-['inter-bold']">
          {exp.paidmemberUsername?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <Card className="bg-zinc-950 border-white/10 hover:border-white/20 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold text-base font-['inter-bold'] truncate leading-tight">
                    {exp.title}
                  </h3>
                  {user?._id && exp.paidBy.toString() === user._id && (
                    <span className="flex-shrink-0 text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-['inter-bold'] border border-emerald-500/20">
                      You
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-400 font-['inter-light-betaa'] flex items-center gap-1.5">
                  <span className="text-zinc-300">Paid by</span>
                  <span className="text-white font-medium">
                    {exp.paidmemberUsername}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500 text-xs">
                    {new Date(exp.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold text-lg font-['inter-bold'] tracking-tight">
                  PKR {exp.totalAmount.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-500 font-['inter-light-betaa'] mt-0.5">
                  {new Date(exp.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center">
                    <span className="text-[10px] text-zinc-400 font-bold">
                      {exp.paidmemberUsername?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-zinc-950 flex items-center justify-center">
                    <span className="text-[10px] text-zinc-300 font-bold">
                      +2
                    </span>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 font-['inter-light-betaa']">
                  Split equally
                </span>
              </div>

              <span className="text-xs text-zinc-400 font-['inter-light-betaa'] bg-zinc-900/50 px-2 py-1 rounded-md">
                #{exp.groupId.toString().slice(-4).toUpperCase()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ));
}

export default ExpensesList;
