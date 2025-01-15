<?php

namespace app\common\model;

use think\Model;

class MessageModel extends BaseModel
{
    //
    protected $autoWriteTimestamp = 'datetime';
    protected $table = 'message';
    public function getListCharacterId($id, $zoneId)
    {
        return $this->where([
            ['character_id', '=', $id]
        ])->limit(3)->field('character_id,create_time,content')->select();
    }

}
