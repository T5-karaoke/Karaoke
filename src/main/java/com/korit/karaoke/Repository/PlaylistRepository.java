package com.korit.karaoke.repository;

import com.korit.karaoke.entity.User.PlaylistImage;
import com.korit.karaoke.entity.User.PlaylistDtl;

import com.korit.karaoke.web.dto.PlaylistDtlDto;
import com.korit.karaoke.web.dto.PlaylistInfoReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlaylistRepository {

    public int registerPlaylistImages(List<PlaylistImage> playlistImages);

    public PlaylistImage findPlaylistImageByImageId(int imageId);

    public int deletePlaylistImage(int imageId);

    public int savePlaylistInfo(PlaylistInfoReqDto playlistInfoReqDto);

    public int UpdatePlaylistInfoByUserId(PlaylistInfoReqDto playlistInfoReqDto);

    public List<PlaylistDtl> findUserPlaylistByUserId(int userId);

    public int saveUserPlaylist(PlaylistDtlDto playlistDtlDto);

    public int deleteUserPlaylist(int songId);


}
