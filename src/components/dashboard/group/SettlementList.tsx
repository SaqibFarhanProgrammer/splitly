import mongoose from "mongoose";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { ArrowRight, CheckCircle2, Wallet, User } from "lucide-react";

export interface SettlementType {
  _id: string;
  type: string;
  groupId: mongoose.Types.ObjectId | string;
  paidBy: mongoose.Types.ObjectId | string;
  paidTo: mongoose.Types.ObjectId | string;
  amount: number;
  paidByUserAvatar?: string;
  paidByUserName?: string;
  paidToUserName?: string;
  paidToUserAvatar?: string;
  note?: string;
  createdAt: string;
}

interface SettlementListProps {
  settlements: SettlementType[];
}

function SettlementList({ settlements }: SettlementListProps) {
  const { user } = useAuth();

  const toStringId = (
    id: mongoose.Types.ObjectId | string | undefined,
  ): string => {
    if (!id) return "";
    return id.toString();
  };
  console.log(settlements);

  return (
    <div className="space-y-3">
      {settlements.map((settlement, index) => {
        const paidByStr = toStringId(settlement.paidBy);
        const paidToStr = toStringId(settlement.paidTo);
        const currentUserId = user?._id?.toString();

        const isPayer = currentUserId === paidByStr;
        const isReceiver = currentUserId === paidToStr;
        const isYouInvolved = isPayer || isReceiver;

        const payerName =
          settlement.paidByUserName || (isPayer ? "You" : "Unknown");
        const receiverName =
          settlement.paidToUserName || (isReceiver ? "You" : "Unknown");

        const isSelfSettlement = paidByStr === paidToStr;

        return (
          <div key={settlement._id || index} className="flex gap-3 items-start">
            <div className="w-11 h-11 flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 border-2 border-emerald-500/30 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex-1 min-w-0">
              <Card
                className={`bg-zinc-950 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg shadow-emerald-900/5 ${isSelfSettlement ? "border-yellow-500/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-base font-['inter-bold'] flex items-center gap-2">
                          {isSelfSettlement ? "Self Settlement" : "Settlement"}
                          {isYouInvolved && !isSelfSettlement && (
                            <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-['inter-bold'] border border-emerald-500/20">
                              {isPayer ? "You Paid" : "You Received"}
                            </span>
                          )}
                          {isSelfSettlement && (
                            <span className="text-[10px] bg-yellow-500/15 text-yellow-400 px-2 py-0.5 rounded-full font-['inter-bold'] border border-yellow-500/20">
                              Self
                            </span>
                          )}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 ring-2 ring-zinc-800">
                            <AvatarImage
                              src={settlement.paidByUserAvatar}
                              alt={payerName}
                            />
                            <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                              {payerName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-zinc-300 font-medium truncate max-w-[80px]">
                            {isPayer ? "You" : payerName}
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <ArrowRight
                            className={`w-4 h-4 ${isSelfSettlement ? "text-yellow-500 rotate-90" : "text-emerald-500"}`}
                          />
                          <span
                            className={`text-[10px] font-['inter-bold'] ${isSelfSettlement ? "text-yellow-500/80" : "text-emerald-500/80"}`}
                          >
                            {isSelfSettlement ? "SELF" : "PAID"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 ring-2 ring-zinc-800">
                            <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                              {paidToStr.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-zinc-300 font-medium truncate max-w-[80px]">
                            {isReceiver ? "You" : receiverName}
                          </span>
                        </div>
                      </div>

                      {settlement.note && (
                        <p className="text-xs text-zinc-500 italic mb-2 bg-zinc-900/50 p-2 rounded-lg">
                          "{settlement.note}"
                        </p>
                      )}

                      <p className="text-xs text-zinc-500 font-['inter-light-betaa'] flex items-center gap-1.5">
                        <CheckCircle2
                          className={`w-3 h-3 ${isSelfSettlement ? "text-yellow-500" : "text-emerald-500"}`}
                        />
                        <span>Settled on</span>
                        <span className="text-zinc-400">
                          {new Date(settlement.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-600">
                          {new Date(settlement.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div
                        className={`border rounded-lg px-3 py-2 ${isSelfSettlement ? "bg-yellow-500/10 border-yellow-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}
                      >
                        <p
                          className={`font-bold text-lg font-['inter-bold'] tracking-tight ${isSelfSettlement ? "text-yellow-400" : "text-emerald-400"}`}
                        >
                          PKR {settlement.amount.toLocaleString()}
                        </p>
                        <p
                          className={`text-[10px] font-['inter-bold'] uppercase tracking-wider mt-0.5 ${isSelfSettlement ? "text-yellow-500/70" : "text-emerald-500/70"}`}
                        >
                          {isSelfSettlement ? "Self Paid" : "Settled"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${isSelfSettlement ? "bg-yellow-500" : "bg-emerald-500"}`}
                      />
                      <span className="text-xs text-zinc-500 font-['inter-light-betaa']">
                        {isSelfSettlement
                          ? "Self payment recorded"
                          : "Payment confirmed"}
                      </span>
                    </div>

                    <span className="text-xs text-zinc-600 font-['inter-light-betaa'] bg-zinc-900/50 px-2 py-1 rounded-md">
                      #{toStringId(settlement.groupId).slice(-4).toUpperCase()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SettlementList;
