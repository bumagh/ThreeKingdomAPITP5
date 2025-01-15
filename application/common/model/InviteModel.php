<?php

namespace app\common\model;


class InviteModel extends BaseModel
{
    //
    protected $table = 'invite';
    public function getListBycode($inviteCode)
    {
        return $this->where([
            ['invitecode', '=', $inviteCode],
            ['status', '=', 1]
        ])->field('id')->find();
    }
}
